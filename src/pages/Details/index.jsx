import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Container, Links, Content } from "./style.js";
import { Button } from "../../components/Button/index.jsx";
import { ButtonText } from "../../components/ButtonText/index.jsx";
import { Header } from "../../components/Header/index.jsx";
import { Modal } from "../../components/Modal/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import { Tag } from "../../components/Tag/index.jsx";
import { api } from "../../services/api.js";

export function Details() {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsOpenModal] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    if (confirm) {
      await api.delete(`/notes/${params.id}`).then(() => {
        navigate(-1);
        toast.success("Nota excluída com sucesso!");
      });
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, [params.id]);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir Nota" onClick={handleOpenModal} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>

            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={tag.id} title={tag.name} />
                ))}
              </Section>
            )}
            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
      {isModalOpen && (
        <Modal
          title="Deseja realmente excluir essa nota ?"
          onCancel={handleCloseModal}
          onConfirm={handleRemove}
        />
      )}
    </Container>
  );
}
