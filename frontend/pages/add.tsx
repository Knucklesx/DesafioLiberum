import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Icon from "@src/components/Icon/Icon";
import Text from "@src/components/Text/Text";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddEmpresaForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const onSubmit = async (data) => {
    const dateParts = data.data_de_registro.split("-");
    const year = parseInt(dateParts[0], 10);
    if (year < 1900 || year > new Date().getFullYear()) {
      alert("Data de Registro deve estar entre 1900 e o ano atual.");
      return;
    }

    data.data_de_registro = formatDate(data.data_de_registro);

    const response = await fetch("http://localhost:3001/empresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        status: data.status.toLowerCase(),
      }),
    });

    if (response.ok) {
      toast("Empresa adicionada com Sucesso!", {
        onClose: () => {
          router.push("/");
        },
        theme: "colored",
        type: "success",
      });
    } else {
      toast("Erro ao criar a empresa", {
        theme: "colored",
        type: "error",
      });
    }
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        styleSheet={{
          paddingTop: "138px",
          paddingLeft: "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleBackClick}
            styleSheet={{
              marginRight: "-15px",
              textDecoration: "none",
              color: "black",
            }}
            variant="ghost"
            size="xxx"
          >
            <Icon name="setaBack" size="lg" />
          </Button>
          <Text variant="heading2" styleSheet={{ marginTop: "12px" }}>
            Adicionar empresa
          </Text>
        </div>
        <Box styleSheet={{ padding: "94px 64px 0 0", gap: "3px" }}>
          <label style={{ display: "block", width: "100%" }}>
            Razão Social:
            <input
              type="text"
              id="razao_social"
              required
              style={{
                minWidth: "100%",
                border: errors.razao_social
                  ? "1px solid red"
                  : "1px solid #B8C2C8",
                borderRadius: "5px",
                padding: "10px",
              }}
              placeholder="Razão Social"
              {...register("razao_social", {
                required: "Razão Social é obrigatória",
              })}
            />
            {errors.razao_social && (
              <p className="text-red-500 text-xs mt-1">
                {errors.razao_social.message.toString()}
              </p>
            )}
          </label>
        </Box>
        <div
          style={{
            display: "flex",
            padding: "32px 64px 0 0",
            gap: "3px",
            maxWidth: "80%",
          }}
        >
          <label style={{ flex: 1 }}>
            Status:
            <select
              id="status"
              required
              style={{
                minWidth: "100%",
                border: errors.status ? "1px solid red" : "1px solid #B8C2C8",
                borderRadius: "5px",
                padding: "10px",
                paddingRight: "100px",
              }}
              {...register("status", { required: "Status é obrigatório" })}
            >
              <option value="" disabled style={{ color: "gray" }}>
                Selecionar
              </option>
              <option value="Vigente">Vigente</option>
              <option value="Expirado">Expirado</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message.toString()}
              </p>
            )}
          </label>
          <label style={{ flex: 2, padding: "0 20px 0 20px" }}>
            CNPJ:
            <input
              type="text"
              id="cnpj"
              required
              style={{
                minWidth: "100%",
                border: errors.cnpj ? "1px solid red" : "1px solid #B8C2C8",
                borderRadius: "5px",
                padding: "10px",
              }}
              placeholder="xx.xxx.xxx/xxxx-xx"
              {...register("cnpj", { required: "CNPJ é obrigatório" })}
            />
            {errors.cnpj && (
              <p style={{ color: "red" }}>{errors.cnpj.message.toString()}</p>
            )}
          </label>
          <label style={{ flex: 1 }}>
            Data de Registro:
            <input
              type="date"
              id="data_de_registro"
              required
              style={{
                minWidth: "100%",
                border: errors.data_de_registro
                  ? "1px solid red"
                  : "1px solid #B8C2C8",
                borderRadius: "5px",
                padding: "10px",
              }}
              placeholder="Data de Registro"
              {...register("data_de_registro", {
                required: "Data de Registro é obrigatória",
              })}
            />
            {errors.data_de_registro && (
              <p className="text-red-500 text-xs mt-1">
                {errors.data_de_registro.message.toString()}
              </p>
            )}
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "32px 64px 0 0",
            gap: "10px",
          }}
        >
          <Button
            onClick={handleBackClick}
            variant="outlined"
            styleSheet={{ borderRadius: "40px" }}
            size="sm"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            styleSheet={{ borderRadius: "40px" }}
            size="sm"
            disabled={isSubmitting}
          >
            Concluir
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default AddEmpresaForm;
