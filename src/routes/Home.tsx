import React, { FormEventHandler } from "react";

function Home() {
  const url: string = "https://api.weatherapi.com/v1/current.json";
  const key: string = "?key=504401a30cca4d78a59232940230101";

  interface Local {
    name: string;
    country: string;
    region: string;
  }

  interface Tempo {
    condition: { text: string; icon: string };
    feelslike_c: number;
    temp_c: number;
    last_updated: string;
    humidity: number;
    wind_kph: number;
  }

  const [tempo, setTempo] = React.useState<Tempo | null>(null);
  const [local, setLocal] = React.useState<Local | null>(null);
  const [search, setSearch] = React.useState<string | null | "rio de janeiro">("rio de janeiro");
  const [state, setState] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(`${url}${key}&q=${search}&lang=pt`);
      const data = await response.json();
      if (data) {
        setTempo(data.current);
        setLocal(data.location);
      }
    }
    fetchWeather();
  }, [search]);

function handleSubmit(e: React.SyntheticEvent<EventTarget>){
  e.preventDefault()
  setSearch(state)
}
function onChange(e: React.SyntheticEvent<EventTarget>){
  if (e.target instanceof HTMLInputElement){
    setState(e.target.value)
  }
}


  return (
    <div className="home">
      <form className="form" onSubmit={handleSubmit}>
        <button>Buscar</button>
        <input
          onChange={onChange}
          type="text"
          placeholder="Digite o nome do sua cidade..."
        />
        <h3>Veja o tempo na sua cidade</h3>
      </form>

      {!local && !tempo ? (
        <p className='failSearch'>Busca não encontrada</p>
      ) : (
        <div className="conteudo">
          <div>
            <img src={tempo?.condition.icon} alt={tempo?.condition.text} />
            <div className="estado">
              <h2>{local?.name}</h2>
              <span> - {local?.region}</span>
            </div>
            <span>{local?.country}</span>
          </div>
          <div  className="caracteristicas">
            <h2>{tempo?.condition.text}</h2>
            <ul>
              <li>Temperatura: {tempo?.temp_c} °C</li>
              <li>Sensação térmica: {tempo?.feelslike_c} °C</li>
              <li>Humidade: {tempo?.humidity}%</li>
              <li>Vento: {tempo?.wind_kph} km/h</li>
            </ul>
          </div>
          <span className="att">Última atualização: {tempo?.last_updated}</span>
        </div>
      )}
    </div>
  );
}

export default Home;
