require("dotenv").config();

const {
  leerInput,
  pausa,
  inquirerMenu,
  listadoLugares,
} = require("./helpers/inquirer");

const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;
  do {
    //imprime el menú
    opt = await inquirerMenu(); //la pregunta

    switch (opt) {
      case 1:
        const nombre = await leerInput("Ciudad:"); //esto es para que el usuario escriba la ciudad que quiere buscar
        const lugares = await busquedas.ciudad(nombre);
        const id = await listadoLugares(lugares);
        if (id === "0") continue;

        const lugarSel = lugares.find((lugar) => lugar.id === id);

        busquedas.agregarHistorial(lugarSel.nombre);

        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarSel.nombre.green);
        console.log("Lat:", lugarSel.lat);
        console.log("Lng:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Mínima:", clima.min);
        console.log("Máxima:", clima.max);
        console.log("Como está el clima:", clima.desc.green);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, index) => {
          const idx = `${index + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0); //mientras la opción sea diferente de 0
};

main();
