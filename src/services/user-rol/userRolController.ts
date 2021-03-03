import {getRepository} from "typeorm";
import { UserRol } from "../../entity/UserRol";
import { strict } from "assert";

/**
 * Controlador de acceso a base de datos
 * para las zonas
 */
export class UserRolController {
    /**
     * Obtiene un determinada zona
     * @param oid el id de la zona
     * @return la zona
     * @throws un error si no lo encuentra
     */
    static findOne = async (id) => {
        const userRolRepository = getRepository(UserRol, "mysql");
        return await userRolRepository.findOneOrFail({
            select: ["id", "userid", "rolid"],
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
        const userRolRepository = getRepository(UserRol, "mysqlDataBase");
        const user= await userRolRepository.find({
            select: ["id", "userid", "rolid"],
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
    static insert = async (user: UserRol, creator: number) => {
        const userRolRepository = getRepository(UserRol, "mysql");
        return await userRolRepository.createQueryBuilder()
            .insert()
            .values(user)
            .returning('oid, "userid", "rolid"')
            .execute();
    };
    /**
     * Actualiza una zona
     * @param id el id de la zona
     * @param zone la zona actualizada
     * @return la zona
     */
    static update = async (id, user: UserRol, editor: number) => {
        const userRolRepository = getRepository(UserRol, "mysql");
        return await userRolRepository.update({id: id}, user);
    };
    /**
     * Borra una zona
     * @param id el id de la zona
     * @return Un objeto indicando si se ha borrado
     */
    static delete = async (id) => {
        const userRolRepository = getRepository(UserRol, "mysql");
        return await userRolRepository.delete({id: id});
    }


     /**
     * Borrado lógico de una zona
     * @param zone el id de la zona que se va a borrar
     * @param remover el id del usuario que ha  ejecutado el borrado
     * @return Un objeto indicando si se ha borrado
     */
    static logicDelete = async (zone: number, remover: number) => {
        
        const userToDelete: UserRol = await UserRolController.findOne(zone);
        
        // Insertamos los campos para auditar

        const userRolRepository = getRepository(UserRol, "mysql");

        return await userRolRepository.update({id: zone}, userToDelete);
    }
}
