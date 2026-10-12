export const validateBody = (req, res, next) => {
    if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({ message: "No se proporciona un cuerpo válido en la solicitud." });
    }

    const { nombre, apellido, correo } = req.body;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (req.method === "POST") {
        if (!nombre?.toString().trim() || !apellido?.toString().trim() || !correo?.toString().trim()) {
            return res.status(400).json({ message: "Todos los campos son obligatorios para crear un usuario." });
        }

        if (!correoRegex.test(correo.toString().trim())) {
            return res.status(400).json({ message: "El correo electrónico no tiene un formato válido." });
        }

        return next();
    }

    if (req.method === "PUT") {
        const tieneCampos = [nombre, apellido, correo].some((valor) => valor !== undefined && valor !== null && valor.toString().trim() !== "");

        if (!tieneCampos) {
            return res.status(400).json({ message: "Debes enviar al menos un campo para actualizar." });
        }

        if (correo !== undefined && correo !== null && correo.toString().trim() !== "" && !correoRegex.test(correo.toString().trim())) {
            return res.status(400).json({ message: "El correo electrónico no tiene un formato válido." });
        }

        return next();
    }

    next();
}