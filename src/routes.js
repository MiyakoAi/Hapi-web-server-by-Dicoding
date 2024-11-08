import { addNotesHandler, deleteNoteByIdHandler, editNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler } from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method : 'GET',
    path : '/notes/{id}',
    handler : getNoteByIdHandler,
  },
  {
    method : 'PUT',
    path : '/notes/{id}',
    handler : editNoteByIdHandler,
  },
  {
    method : 'DELETE',
    path : '/notes/{id}',
    handler : deleteNoteByIdHandler,
  }
];

export default routes;
