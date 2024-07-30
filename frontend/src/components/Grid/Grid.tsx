import { useRouter } from "next/router";
import React, { useState } from "react";
import Box from "../Box/Box";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";

interface GridProps {
  empresa?: {
    razao_social: string;
    cnpj: string;
    status: string;
    data_de_registro: string;
  };
  handleInputChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleDateInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel?: () => void;
  handleSave?: () => void;
  handleDelete?: () => void;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
  [key: string]: any;
}

export default function Grid({
  empresa,
  handleInputChange,
  handleDateInputChange,
  handleCancel,
  handleSave,
  handleDelete,
  isEditing,
  setIsEditing,
  ...props
}: GridProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  const handleDeleteConfirm = () => {
    if (handleDelete) handleDelete();
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
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
          Detalhes da Empresa
        </Text>
      </div>
      <Box styleSheet={{ padding: "94px 64px 0 0", gap: "3px" }}>
        <label style={{ display: "block", width: "100%" }}>
          Razão Social:
          <input
            type="text"
            name="razao_social"
            value={empresa?.razao_social || "Digite a Razão Social da empresa"}
            onChange={handleInputChange}
            style={{
              minWidth: "100%",
              border: "1px solid #B8C2C8",
              borderRadius: "5px",
              padding: "10px",
            }}
            disabled={!isEditing}
          />
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
            name="status"
            value={empresa?.status || ""}
            onChange={handleInputChange}
            style={{
              minWidth: "100%",
              border: "1px solid #B8C2C8",
              borderRadius: "5px",
              padding: "10px",
              paddingRight: "100px",
            }}
            disabled={!isEditing}
          >
            <option value="" disabled>
              Selecionar
            </option>
            <option value="Vigente">Vigente</option>
            <option value="Expirado">Expirado</option>
          </select>
        </label>
        <label style={{ flex: 2, padding: "0 20px 0 20px" }}>
          CNPJ:
          <input
            type="text"
            name="cnpj"
            value={empresa?.cnpj || "xx.xxx.xxx/xxxx-xx"}
            onChange={handleInputChange}
            style={{
              minWidth: "100%",
              border: "1px solid #B8C2C8",
              borderRadius: "5px",
              padding: "10px",
            }}
            disabled={!isEditing}
          />
        </label>
        <label style={{ flex: 1 }}>
          Data de Registro:
          <input
            type="date"
            name="data_de_registro"
            value={empresa?.data_de_registro || "dd/mm/aaaa"}
            onChange={handleDateInputChange}
            style={{
              minWidth: "100%",
              border: "1px solid #B8C2C8",
              borderRadius: "5px",
              padding: "10px",
            }}
            disabled={!isEditing}
          />
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
        {isEditing ? (
          <>
            <Button
              onClick={handleCancel}
              variant="outlined"
              styleSheet={{ borderRadius: "40px" }}
              size="sm"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              styleSheet={{ borderRadius: "40px" }}
              size="sm"
            >
              Concluir
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setIsEditing(true)}
              styleSheet={{ borderRadius: "40px" }}
              size="sm"
            >
              Editar
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(true)}
              variant="outlined"
              styleSheet={{ borderRadius: "40px" }}
              size="sm"
            >
              Excluir
            </Button>
          </>
        )}
      </div>

      {isDeleteModalOpen && (
        <Modal
          UpperText="Excluir empresa"
          LowerText={`Você tem certeza que deseja excluir a empresa ${empresa.razao_social}`}
          onClose={() => setIsDeleteModalOpen(false)}
          isOpen={isDeleteModalOpen}
          handleDeleteConfirm={handleDeleteConfirm}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        ></Modal>
      )}
    </Box>
  );
}
