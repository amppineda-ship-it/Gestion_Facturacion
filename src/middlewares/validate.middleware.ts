import { Request, Response, NextFunction } from 'express';  
//Aqui importamos los tipos de express Request es la peticion de usuario. // 
//Response la respuesta del servidor. // 
//NextFunction permite pasar al siguiente middleware. // 


import { AnyZodObject, ZodError } from 'zod';
//Cualquier esquema de validacion del zod y los errores producidos por el mismo. //

export const validateTask = (schema: AnyZodObject) => { // Funcion reutilizable deñ zod //
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //Devuelve una funcion middleware  para Express que valida el cuerpo de la petición //
        //  usando el esquema proporcionado. //

        try { // Valida // 
            schema.parse(req.body); // Valida los datos enviados // 
            next();  // Si la validacion es correcta, pasa al siguiente middleware o controlador. //
        } catch (error) { // Captura errores de validacion //
            if (error instanceof ZodError) { // Determina si el error es un error de validacion de Zod. //
                res.status(400).json({ // Devuelve un codigo HTTP 400 o un mensaje JSON // 
                    status: "error_validacion",
                    errors: error.errors.map(err => ({ //Recorre todos los errores de validacion. //
                        campo: err.path[0], // Obtiene el campo que produjo el error. //
                        mensaje: err.message // Obtiene el mensaje de error. //
                    }))
                });
                return;
            }
            next(error); //Si no es error del zod, pasa el error al siguiente middleware de manejo de errores. //
            
        }
    };
};