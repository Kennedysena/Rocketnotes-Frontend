import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Container,Search, Content} from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { MenuBar } from "../../components/MenuBar";
import { Note } from "../../components/Note";
import { Section } from "../../components/Section";
import { api } from "../../services/api";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName); // includes verifica se a tag ja esta selecionada

    if (alreadySelected) {
      // se está selecionada vou fazer alguma coisa
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName); // vai retornar um array com as tags que não estão selecionadas
      setTagsSelected(filteredTags);
    } else {
      setTagsSelected((prevState) => [...prevState, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`,
      );
      setNotes(response.data);
    }
    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Header onOpenMenu={() => setMenuIsOpen(true)}/>
      <MenuBar
        tags={tags}
        tagsSelected={tagsSelected}
        handleTagSelected={handleTagSelected}
        menuIsOpen={menuIsOpen}
        onCloseMenu={() => setMenuIsOpen(false)}
      />
      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Search>
      <Content>
        <Section title="Minhas notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>
    </Container>
  );
}
