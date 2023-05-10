import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { AiOutlinePlus } from "react-icons/ai";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-10`,
  heading: `font-bold text-3xl text-center p-2 text-gray-800`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100 `,
  count: `text-center`,
};
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  //Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("please add some tasks");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
  };
  //Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  //Update todo from firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  //Delete todo from firebase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db,"todos",id))
  }
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.heading}>Todo</div>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="your task"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
