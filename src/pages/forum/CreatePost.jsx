import React from 'react';

import { TextEditor } from '../../components/ui/TextEditor';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';
import { forumAPI } from '../../store/services/ForumService';
import { Box, Button, Chip, TextField } from '@mui/material';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'


const categories = [
  {
    id: 1,
    title: 'Учеба',
    value: 'study'
  },
  {
    id: 2,
    title: 'Работа',
    value: 'job'
  },
  {
    id: 3,
    title: 'Развлечения',
    value: 'entertainment'
  }
];

export const CreatePost = () => {
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector(state => state.auth);
  const [createPost] = forumAPI.useCreatePostMutation();

  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [post, setPost] = React.useState({
    title: "",
    description: ""
  });

  const addCategory = (category) => {
    if (selectedCategories.some(el => el.id === category.id)) {
      const filtered = selectedCategories.filter(el => el.id !== category.id);
      setSelectedCategories(filtered);
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const getValue = (event) => {
    const { name, value } = event.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const getEditorValue = (value) => {
    setPost({ ...post, description: value });
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    const data = {
      ...post,
      user,
      categories: selectedCategories,
      authorId: user?.id,
      createdAt: serverTimestamp()
    }
    try {
      await createPost(data).unwrap();
      toast.success("Создано!");
    } catch (e) {
      toast.success("Произошла ошибка!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleCreatePost}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: '20px',
      }}
    >
      <Box>
        <Box>Название поста</Box>
        <TextField
          label="Название поста"
          name="title"
          value={post.title}
          onChange={getValue}
          sx={{ width: "100%", background: isDarkMode ? "dark" : "white" }}
        />
      </Box>
      <Box>
        <Box>Описание</Box>
        <SunEditor
          height="300px"
          setContents={post?.description}
          onChange={getEditorValue}
          setOptions={{ buttonList: buttonList.complex}}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {categories.map(category => (
          <Chip
            key={category.value}
            label={category.title}
            color={selectedCategories.some(el => el.id === category.id) ? "secondary" : "default"}
            onClick={() => addCategory(category)}
          />
        ))}
      </Box>
      <Button variant="contained" type="submit" sx={{ width: "120px" }}>Создать</Button>
    </Box>
  );
};
