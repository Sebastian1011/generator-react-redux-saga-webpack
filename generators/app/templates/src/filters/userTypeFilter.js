/**
 * Created by hbwang on 8/11/17.
 */
import AppConst from "../constants";

const roleMap = AppConst.USER_ROLE;

export const userTypeFilter = (type) => {
    return roleMap[type];
};