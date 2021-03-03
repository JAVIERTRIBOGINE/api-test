import {getRepository} from "typeorm";
import { User } from "../../entity/User";
import { strict } from "assert";

/**
 * Controlador de acceso a base de datos
 * para las zonas
 */
export class UserController {
    /**
     * Obtiene un determinada zona
     * @param oid el id de la zona
     * @return la zona
     * @throws un error si no lo encuentra
     */
    static findOne = async (id) => {
        const userRepository = getRepository(User, "mysql");
        return await userRepository.findOneOrFail({
            select: ["id", "alias", "mail"],
            where: {
                oid: id
            }
        })
    };

    /**
     * Obtiene todos las zonas
     * @return un vector con las zonas
     */
    static listAll = async () => {
        const userRepository = getRepository(User, "mysqlDataBase");
        const user= await userRepository.find({
            select: ["id", "name", "alias", "mail"],
            order: {
                id: 'ASC'
            }
        });
        
         
 
         // Se añade el nombre del pais al array de objetos que se envía
        return user;
    };

   

    /**
     * inserta una zona
     * @param zone la zona a insertar
     * @return la zona insertada
     */
    static insert = async (user: User, creator: number) => {
        const userRepository = getRepository(User, "mysql");
        return await userRepository.createQueryBuilder()
            .insert()
            .values(user)
            .returning('oid, "alias", "mail", "name"')
            .execute();
    };
    /**
     * Actualiza una zona
     * @param id el id de la zona
     * @param zone la zona actualizada
     * @return la zona
     */
    static update = async (id, user: User, editor: number) => {
        const userRepository = getRepository(User, "mysql");
        return await userRepository.update({id: id}, user);
    };
    /**
     * Borra una zona
     * @param id el id de la zona
     * @return Un objeto indicando si se ha borrado
     */
    static delete = async (id) => {
        const userRepository = getRepository(User, "mysql");
        return await userRepository.delete({id: id});
    }


     /**
     * Borrado lógico de una zona
     * @param zone el id de la zona que se va a borrar
     * @param remover el id del usuario que ha  ejecutado el borrado
     * @return Un objeto indicando si se ha borrado
     */
    static logicDelete = async (zone: number, remover: number) => {
        
        const userToDelete: User = await UserController.findOne(zone);
        
        // Insertamos los campos para auditar

        const userRepository = getRepository(User, "mysql");

        return await userRepository.update({id: zone}, userToDelete);
    }
}
