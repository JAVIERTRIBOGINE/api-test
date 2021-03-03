import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../../config/config"
import { UserRol } from "../../entity/UserRol";

/**
 * Controlador de acceso a base de datos
 * para autenticación
 */
export class AuthController {
    /**
     * Método de login en la API
     * @param loginData datos del logeo. Concretamente, el entercode
     * que se compone de una cadena cifrada de usuario y contrasenia
     */
    static login = async (loginData: any) => {
        try {
            // Obtenemos el entercode y deshacemos la conversión  de base64
            const entercode = Buffer.from(loginData.entercode, 'base64').toString();
            // Separamos usuario y contraseña
            const userData = entercode.split('.');

            // Obtenemos el usuario
            userData[0] = Buffer.from(userData[0], 'base64').toString().toLowerCase(); // username
            // Obtenemos la contraseña
            userData[1] = Buffer.from(userData[1], 'base64').toString(); // pass

            let user: User;

            // Obtenemos el usuario almacenado en la base de datos
            const userRepository = getRepository(User, 'mysqlDataBase');
            user = await userRepository.findOne({
                select:['name', 'mail', 'alias', 'id'],
                where: {
                 mail: userData[0],
                 password: userData[1]
                }
             });


            // Obtenemos la clave con la que se cifra la pass
            // const client = new SecretsClient(process.env.KEY_VAULT_URI, credential);
            // const secret = await client.getSecret("prismaajwtkey");

            // let access: AccessService = null;
            // let service: Service = null;
            // let zoneId: number = null;
            // let serviceId: number = null;
            // let accessServiceRepository = getRepository(AccessService, 'mysqlDataBase');
            // let accessServiceList = await acessRepository.find({ user_oid: user.oid });
            // let accessServiceList = await accessServiceRepository.find({
            //     select: ["oid", "zone_oid", "service_oid", "country_oid", "group_oid"],
            //     where: {
            //         user_oid: user.oid,
            //     },
            //     // order: { oid: 'ASC' },
            // });

            // if (!accessServiceList || accessServiceList.length == 0) {
            //     return { ok: false, user_oid: user.oid, message: "no hay role para este usuario en la tabla accessService" };
            // }

            // accessServiceList = accessServiceList.sort((a, b) => (a.oid > b.oid ? 1 : -1));
            // let groupByObj = accessServiceList.reduce((p, c) => (p[c.group_oid] ? p[c.group_oid].push(c) : p[c.group_oid] = [c], p), {});
            // let listGroupOid = Object.keys(groupByObj).map(k => k);

            const UserRolRepository = getRepository(UserRol, 'mysqlDataBase');
            let userRol = await UserRolRepository.find(
                {
                    select: ["userid", "rolid"],
                    where: {
                        userid: user.id,
                    },
                    // order: { oid: 'ASC' },
                }
            );

            // //Comprobamos que existe el grupo del usuario
            // listGroupOid.forEach(element => {
            //     if (!groupList.find(x => x.oid == parseInt(element))) {
            //         accessServiceList = [];
            //     }
            // });

            // if (!accessServiceList || accessServiceList.length == 0) {
            //     return { ok: false, user_oid: user.oid, message: "no existe role en la tabla group" };
            // }

            // if (accessServiceList.filter(x => x.group_oid != rolesUsuario.COUNTRYMANAGER &&
            //     x.group_oid != rolesUsuario.JEFEZONA &&
            //     x.group_oid != rolesUsuario.JEFESERVICIO &&
            //     x.group_oid != rolesUsuario.ADMINISTRADOR &&
            //     x.group_oid != rolesUsuario.OPERARIO &&
            //     x.group_oid != rolesUsuario.DIRECCION &&
            //     x.group_oid != rolesUsuario.DESARROLLONEG).length > 0) {

            //     return { ok: false, user_oid: user.oid, message: "algún role sin negocio" };
            // }

            // if (accessServiceList.filter(x => x.group_oid == rolesUsuario.ADMINISTRADOR ||
            //     x.group_oid == rolesUsuario.DIRECCION ||
            //     x.group_oid == rolesUsuario.DESARROLLONEG).length > 0) {

            //     access = accessServiceList.filter(x => x.group_oid != rolesUsuario.COUNTRYMANAGER &&
            //         x.group_oid != rolesUsuario.JEFEZONA &&
            //         x.group_oid != rolesUsuario.JEFESERVICIO)[0];

            //     accessServiceList = [];

            //     accessServiceList.push(access);
            // }

            // if (accessServiceList.filter(x => x.group_oid == rolesUsuario.OPERARIO).length > 0) {
            //     accessServiceList = accessServiceList.filter(x => x.group_oid == rolesUsuario.OPERARIO);
            // }

            //----------------------------------------------------------------------------

            // Creamos el token JWT
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                mail: user.mail,
                alias: user.alias,
                userRol: userRol,
                entercode: entercode
            },
                <string>config.jwtSecret,
                {
                    expiresIn: 60 * 60 * 4 // duración de 4 horas
                }
            );
            return {
                ok: true,
                jwt: token,
                id: user.id,
                name: user.name,
                mail: user.mail,
                userRol: userRol
                // group_oid: access != null ? access.group_oid : null,
                // accessServiceList: accessServiceList,
            };

        } catch(e) {
            return { ok: false, userid: null };
        }
    }
}
