"use client";
import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Icon from "@src/components/Icon/Icon";
import Input from "@src/components/Input/Input";
import Text from "@src/components/Text/Text";
import CnpjMask from "@src/helpers/Cnpj.mask";
import { useTheme } from "@src/theme/ThemeProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const empresasPerPage = 10;

interface FeedProps {
  children?: React.ReactNode;
}

interface Empresa {
  id: string;
  cnpj: string;
  razao_social: string;
  status: string;
}

export default function Feed({ children }: FeedProps) {
  const theme = useTheme();

  return (
    <Box
      styleSheet={{
        width: "100%",
        backgroundColor: theme.colors.neutral.x000,
      }}
    >
      {children}
    </Box>
  );
}

Feed.container = function FeedContainer() {
  const theme = useTheme();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [filteredEmpresas, setFilteredEmpresas] = useState<Empresa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCnpj = (cnpj: string) => {
    const newCnpj = CnpjMask(cnpj);
    return newCnpj;
  };

  const removeCnpjMask = (cnpj: string) => {
    return cnpj.replace(/\D/g, "");
  };

  useEffect(() => {
    fetch("http://localhost:3001/empresa")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((empresa: Empresa) => ({
          ...empresa,
          cnpj: handleCnpj(empresa.cnpj),
        }));
        setEmpresas(formattedData);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    // regext to keep only number or word

    const parsedSearchTerm = searchTerm.replace(/\W/g, "").toLowerCase();
    console.log("parsedSearchTerm", parsedSearchTerm);
    if (parsedSearchTerm.length < 3) {
      setFilteredEmpresas(empresas);
      return;
    }

    const empresasResult = empresas
      .map((empresa) => ({
        empresa,
        searchTerm: [
          empresa.razao_social,
          empresa.cnpj.replace(/\D/g, ""),
          empresa.status,
        ]
          .join(" ")
          .toLowerCase(),
      }))
      .filter((t) => t.searchTerm.includes(parsedSearchTerm))
      .map((t) => t.empresa);

    setFilteredEmpresas(empresasResult);
  }, [searchTerm, empresas]);

  // const filteredEmpresas = empresas.filter((empresa) => {
  //   const matchRazaoSocial = empresa.razao_social
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchCnpj = removeCnpjMask(empresa.cnpj).includes(
  //     searchTerm.replace(/\D/g, "")
  //   );

  //   return matchRazaoSocial || matchCnpj;
  // });

  const indexOfLastEmpresa = currentPage * empresasPerPage;
  const indexOfFirstEmpresa = indexOfLastEmpresa - empresasPerPage;
  const currentEmpresas = filteredEmpresas.slice(
    indexOfFirstEmpresa,
    indexOfLastEmpresa
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          padding: "0 0 0 64px",
        }}
      >
        <Feed.Header
          searchTerm={searchTerm}
          setSearchTerm={(t) => {
            console.log(t);
            setSearchTerm(t);
          }}
        />
        <Feed.Post empresas={currentEmpresas} />
        {filteredEmpresas.length > empresasPerPage && (
          <Feed.Pagination
            empresasPerPage={empresasPerPage}
            totalEmpresas={filteredEmpresas.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </Box>
    </>
  );
};

Feed.Header = function FeedHeader({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const theme = useTheme();
  return (
    <Box
      styleSheet={{
        maxWidth: "30%",
        backgroundColor: theme.colors.neutral.x000,
      }}
    >
      <Text>Buscar Empresa</Text>
      <Input
        placeholder="Buscar por Razão Social"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};

Feed.Post = function FeedPost({ empresas }: { empresas: Empresa[] }) {
  const theme = useTheme();
  const route = useRouter();

  const handleDetailsClick = (id: string) => {
    route.push(`/empresa/${id}`);
  };

  return (
    <Box
      styleSheet={{
        backgroundColor: theme.colors.neutral.x000,
        padding: "40px 0 0 0",
      }}
    >
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Razão Social</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.cnpj}>
              <td>{empresa.cnpj}</td>
              <td>{empresa.razao_social}</td>
              <td>{empresa.status}</td>
              <td>
                <Button
                  styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "underline",
                  }}
                  variant="ghost"
                  onClick={() => handleDetailsClick(empresa.id)}
                >
                  <Icon
                    name="eyeIcon"
                    size="sm"
                    styleSheet={{ paddingLeft: "100px" }}
                  />
                  Detalhes
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

Feed.Pagination = function FeedPagination({
  empresasPerPage,
  totalEmpresas,
  paginate,
  currentPage,
}: {
  empresasPerPage: number;
  totalEmpresas: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) {
  const totalPages = Math.ceil(totalEmpresas / empresasPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <Box
      styleSheet={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button onClick={handlePreviousPage} className="page-link">
              Anterior
            </button>
          </li>
        )}
        <Text className="page-link">
          {currentPage} de {totalPages}
        </Text>
        {currentPage < totalPages && (
          <li className="page-item">
            <button onClick={handleNextPage} className="page-link">
              Próxima
            </button>
          </li>
        )}
      </ul>
    </Box>
  );
};
