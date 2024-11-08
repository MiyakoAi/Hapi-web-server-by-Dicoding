import { nanoid } from 'nanoid';
import notes from './notes.js';

export { addNotesHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };

const addNotesHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = {
    title, tags, body, id, createAt, updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.some((note) => note.id === id);

  if (isSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    res.code(201);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  res.code(500);
  return res;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.find((n) => n.id === id);
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  res.code(404);
  return res;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updateAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui!',
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. ID tidak ditemukan',
  });
  res.code(404);
  return res;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. ID tidak ditemukan',
  });
  res.code(404);
  return res;
};
