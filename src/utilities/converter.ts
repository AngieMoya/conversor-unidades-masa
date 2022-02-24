export default function convert(
  from: string,
  to: string,
  input: string
): string | null | undefined {
  if (from !== to) {
    if (from === "mg") {
      switch (to) {
        case "g": {
          const operacion = parseInt(input, 10) / 1000;
          return operacion.toString();
        }
        default: {
          const operacion = parseInt(input, 10) / 1000000;
          return operacion.toString();
        }
      }
    }

    if (from === "g") {
      switch (to) {
        case "mg": {
          const operacion = parseInt(input, 10) * 1000;
          return operacion.toString();
        }

        default: {
          const operacion = parseInt(input, 10) / 1000;
          return operacion.toString();
        }
      }
    }

    if (from === "kg") {
      switch (to) {
        case "g": {
          const operacion = parseInt(input, 10) * 1000;
          return operacion.toString();
        }

        default: {
          const operacion = parseInt(input, 10) * 1000000;
          return operacion.toString();
        }
      }
    }
  }
}
