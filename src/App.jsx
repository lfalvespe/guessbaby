import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const [value, setValue] = useState(null);
  const [sortedGender, setSortedGender] = useState(null);

  const [user, setUser] = useState({});
  const [array, setArray] = useState([]);

  const [countBoy, setCountBoy] = useState(0);
  const [countGirl, setCountGirl] = useState(0);
  const [countTwins, setCountTwins] = useState(0);

  const [gender, setGender] = useState(null);

  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  //INICIAR APÓS INFORMAR NOME E EMAIL
  const handleStart = (e) => {
    e.preventDefault();

    // name && email && setReady(true);
    // !name && !email && setMessage("Informe seu nome e seu email");
    // !name && email && setMessage("Informe seu nome");
    // name && !email && setMessage("Informe seu email");

    if (name && email) {
      setReady(true);
      setMessage("");
    } else if (!name && email) {
      setMessage("Informe seu nome");
    } else if (name && !email) {
      setMessage("infome seu email");
    } else if (!name && !email) {
      setMessage("Informe seu nome e seu email");
    }

    console.log(message);
  };

  // SORTEAR GENDER
  const handleGenerate = () => {
    setLoading(true);

    const random = aleatNumber(0, 2);
    setValue(random);

    setTimeout(() => {
      setSortedGender(
        (random === 0 && "boy") ||
        (random === 1 && "girl") ||
        (random === 2 && "twins")
      );

      random === 0 && setCountBoy(countBoy + 1);
      random === 1 && setCountGirl(countGirl + 1);
      random === 2 && setCountTwins(countTwins + 1);

      handleUser();
      setLoading(false);
    }, 8000);
  };

  //SALVAR USUÁRIO
  const handleUser = () => {
    setUser({
      name,
      email,
      sortedGender,
    });
  };

  // GERAR NÚMERO ALEATÓRIO
  const aleatNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // LIMPAR DADOS:
  const handleReset = () => {
    setName(null);
    setEmail(null);
    setValue(null);
    setSortedGender(null);
    setUser({});
    setReady(false);
  };

  useEffect(() => {
    setUser({ ...user, sortedGender });

    setGender(
      (countBoy > countGirl && countBoy > countTwins && "Menino") ||
      (countGirl > countBoy && countGirl > countTwins && "Menina") ||
      (countTwins > countBoy && countTwins > countGirl && "Gêmeos") ||
      (countBoy == countGirl &&
        countBoy > countTwins &&
        "Empate Menino e Menina") ||
      (countBoy == countTwins &&
        countBoy > countGirl &&
        "Empate Menino e Gêmeos") ||
      (countGirl == countTwins &&
        countGirl > countBoy &&
        "Empate Menina e Gêmeos") ||
      (countBoy == countGirl &&
        countBoy === countTwins &&
        "Empate Menino, Menina e Gêmeos")
    );
  }, [sortedGender]);

  useEffect(() => {
    user.sortedGender && setArray([...array, user]);
  }, [user]);

  return (
    <>
      <header>
        <img
          src="littleprince1.png"
          className="littleprince header-logo"
          alt="little prince logo"
        />

        <h1>Previsão do Baby Di</h1>
      </header>

      <div className="card">
        {/* <h3>Random Value: {value}</h3>
        <h3>Sorted Gender: {sortedGender}</h3>
        <h3>
          Usuário: {user.name && (<span>{user.name} - {user.email} - {user.sortedGender}</span>)}
        </h3> */}

        {!ready && (
          <form className="user-form">
            <fieldset>
              <legend>Informe seus dados</legend>
              <div className="form-control">
                <label>Nome:</label>{" "}
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
              </div>
              <div className="form-control">
                <label>Email:</label>{" "}
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
              <button id="enter-btn" onClick={handleStart}>
                Entrar
              </button>
            </fieldset>
          </form>
        )}

        {ready && !sortedGender && !loading && (
          <div>
            <br />
            <br />
            <h1>
              Olá,
              <span style={{ color: "rgba(233, 200, 54, 1)" }} className="user-name"> {name} </span>!

            </h1>

            <h2>Clique para fazer sua previsão</h2>

            <br />
            <br />
            <br />

            <img src="tap.png" width={50} alt="" className="pointer" onClick={handleGenerate} />

            <br />
            <br />


          </div>
        )}
      </div>

      {message && <h2 className="message">{message}</h2>}

      {loading && (
        <div>
          <img src="littleprince4.png" alt="" className="logo loading" />
          <div className="melting-text-container">
            <h2 className="melting-text">Consultando os astros...</h2>
          </div>
        </div>
      )}

      {sortedGender && (


        <div>
          <h1 style={{ color: 'rgba(233, 200, 54, 1)' }}>Pela sua Previsão...</h1>
          <br />

          <h2>
            Vai ser{" "}
            {(sortedGender === "boy" && <span>um</span>) ||
              (sortedGender === "girl" && <span>uma</span>)}
          </h2>

          <br /><br />

          <img
            src={`${sortedGender}.png`}
            className={sortedGender}
            width={100}
            alt={sortedGender}
          />

          <br /><br />

          {sortedGender === "boy" && <h2 className="Menino">Menino !</h2>}
          {sortedGender === "girl" && <h2 className="Menina">Menina !</h2>}
          {sortedGender === "twins" && <h2 className="Gêmeos">Gêmeos</h2>}

          <br />
          <br />


        </div>
      )}

      <br />
      <br />
      <br />


      {sortedGender && (
        <div>
          <h2 className="result">
            Resultado Parcial: <span className={gender}>{gender}</span>
          </h2>

          <br />
          <br />
          <br />

          <hr />

          <h3 className="read-the-docs">Últimas Previsões</h3>

          <br />

          {array && (
            <div>
              {array.map(
                (v, i) =>
                  i > array.length - 6 && (
                    <div key={i} className="user-data">
                      <div className="user-name">{v.name}</div> <div className="separator"> - </div>
                      <div className="user-guess">
                        {(v.sortedGender === "boy" && (
                          <div className="Menino">Menino</div>
                        )) ||
                          (v.sortedGender === "girl" && (
                            <div className="Menina">Menina</div>
                          )) ||
                          (v.sortedGender === "twins" && (
                            <div className="Gêmeos">Gêmeos</div>
                          ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}


          <br />
          <hr />

          <h3>
            <span>
              &nbsp; Menino:{" "}
              <span style={{ color: "yellow" }}> {countBoy} </span>
            </span>
            &nbsp; | &nbsp;
            <span>
              Menina: <span style={{ color: "yellow" }}> {countGirl} </span>
            </span>
            &nbsp; | &nbsp;
            <span>
              Gêmeos: <span style={{ color: "yellow" }}> {countTwins} </span>
            </span>
          </h3>

          


        </div>




      )}


      <br />
      <br />

      {sortedGender && (
        <>
          <button onClick={handleReset} id="reset-btn">
            Concluído
          </button>
        </>
      )}

      


      <footer>
        <h4>&copy; 2025</h4>
      </footer>
    </>
  );
}

export default App;
