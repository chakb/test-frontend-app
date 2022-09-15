import axios from 'axios';
import { useState } from 'react';
import { baseUrl } from './../constants/Urls';
import './Ejercicio1.css';

function Ejercicio1() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState();
  const [nationality, setNationality] = useState();
  const [age, setAge] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    const genderize = axios.get(`${baseUrl}/genderize/${name}`);
    const nationalize = axios.get(`${baseUrl}/nationalize/${name}`);
    const agify = axios.get(`${baseUrl}/agify/${name}`);

    try {
      const [genderResult, nationalityResult, ageResult] = await Promise.all([
        genderize,
        nationalize,
        agify,
      ]);
      setGender(genderResult.data);
      setNationality(nationalityResult.data);
      setAge(ageResult.data);
    } catch (e) {
      setAge();
      setGender();
      setNationality();
    }
  };

  return (
    <div>
      <h2>Ejercicio 1</h2>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div>
            <input
              id="name"
              type="text"
              placeholder="Nombre"
              required
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <button id="submit-button" type="submit">
            Buscar
          </button>
        </form>

        <div className="name-info-container">
          {gender?.count ? (
            <>
              <div className="name">{gender.name}</div>
              <div>
                <span className="gender">{gender.gender}</span> con probabilidad{' '}
                {gender.probability}
              </div>
              <div>
                {nationality.country.map((c) => (
                  <img
                    className="flag"
                    key={c.country_id}
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${c.country_id}.svg`}
                  />
                ))}
              </div>
              <div>Edad: {age.age}</div>
            </>
          ) : (
            'Busque un nombre válido'
          )}
        </div>
      </div>
    </div>
  );
}

export default Ejercicio1;
