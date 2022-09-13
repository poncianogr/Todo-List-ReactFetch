import React, { useState, useEffect } from "react";
import Text from "./Text.jsx";
import Lista from "./lista.jsx";

const Home = () => {
  const [history, setHistory] = useState([])
  const [val, setVal] = useState();

  const get = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/hanks')
      .then(resp => {
        if (!resp.ok) {
          throw new Error("los datos no han sido cargados")
        }
        return resp.json()
      })
      .then(data => {
        setHistory(data)
      })
      .catch(error => {
        console.log(error)
        createruser()
      });
  }

  const createruser = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/hanks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([]),
    }).then(resp => {
      if (resp.ok)
        get()
      else
        throw new Error("usuario no creado")
    })
      .catch(error =>
        console.log(error))
  }

  const put = () => {
    let aux = [...history, { label: val, done: false }]
    setHistory(aux)
    console.log(aux)
    fetch('https://assets.breatheco.de/apis/fake/todos/user/hanks', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aux)
    }).then(resp => {
      if (resp.ok) {
        get()
      }
      else
        throw new Error("no se ha podido actualizar la lista")
    })
      .catch(error => console.log(error))
  }
  
  const putborrar = (arr) => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/hanks', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(arr)
    }).then(resp => {
      if (resp.ok) {
        get()
      }
      else
        throw new Error("no se ha podido borrar los elementos")
    })
      .catch(error =>
        console.log(error))
  }
  useEffect(() => {
    get()
  }, []);

 
  const borrar = (item) => {
    let aux = history.filter((elemento) => elemento != item)

    if (aux.length == 0)
      Deleteall()

    else {
      setHistory(aux);
      putborrar(aux)
    }
  };


  
  const Deleteall = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/hanks', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(resp => {
      if (resp.ok)
        get()
      else
        throw new Error("no se ha podido borrar todo")
    })
      .catch(error => {
        console.log(error)
      })
  }




  return (
    <div className="container text-center ">
      <Text val={val} setVal={setVal} put={put} />
      <Lista history={history} borrar={borrar} />
      <div className="btn">
        <button type="button" onClick={() => Deleteall()} className="btn btn-danger">Borrar todo</button>
      </div>
    </div>)
}



export default Home;
