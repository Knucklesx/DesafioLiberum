import Box from "@src/components/Box/Box";
import Grid from "@src/components/Grid/Grid";
import CnpjMask from "@src/helpers/Cnpj.mask";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Empresa {
  razao_social: string;
  cnpj: string;
  status: string;
  data_de_registro: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleCnpj = (cnpj: string) => {
    const newCnpj = CnpjMask(cnpj);
    return newCnpj;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/empresa/${slug}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const data = await response.json();
        setEmpresa({
          ...data,
          cnpj: handleCnpj(data.cnpj),
          data_de_registro: new Date(data.data_de_registro)
            .toISOString()
            .split("T")[0],
          status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setEmpresa((prevEmpresa) =>
      prevEmpresa ? { ...prevEmpresa, [name]: value } : null
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmpresa((prevEmpresa) =>
      prevEmpresa ? { ...prevEmpresa, [name]: value } : null
    );
  };

  const handleSave = async () => {
    if (!empresa) return;

    try {
      const response = await fetch(`http://localhost:3001/empresa/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...empresa,
          status: empresa.status.toLowerCase(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar dados");
      }

      const data = await response.json();
      setEmpresa(data);
      toast("Edição processada com sucesso!", {
        onClose: () => {
          router.push("/");
        },
        theme: "colored",
        type: "success",
      });
      setIsEditing(false);
    } catch (error) {
      toast("Erro ao processar a edição", {
        theme: "colored",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/empresa/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      toast("Empresa excluída com Sucesso!", {
        onClose: () => {
          router.push("/");
        },
        theme: "colored",
        type: "success",
      });
    } catch (error) {
      toast("Erro ao excluir a empresa", {
        theme: "colored",
        type: "error",
      });
    }
  };

  if (!empresa) {
    return <Box>Carregando...</Box>;
  }

  return (
    <Grid
      empresa={empresa}
      handleInputChange={handleInputChange}
      handleDateInputChange={handleDateInputChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
      handleDelete={handleDelete}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      formatDate={formatDate}
    />
  );
}

export async function getServerSideProps(context: {
  params: { slug: string };
}) {
  return {
    props: {
      params: context.params,
    },
  };
}
