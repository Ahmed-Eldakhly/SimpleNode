function presentPermission(permissions) {
    let enhancedPermissions = [];
    for(let i = 0; i < permissions.length; i++)
    {
        switch(permissions[i].API_ID)
        {
            case 1:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'login'
                })
                break;
            case 2:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'see users'
                })
                break;
            case 3:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'update users'
                })
                break;
            case 4:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'create users'
                })
                break;
            case 5:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'delete users'
                })
                break;
            case 6:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'see permissions'
                })
                break;
            case 7:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'update permissions'
                })
                break;
            case 8:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'create permissions'
                })
                break;
            case 9:
                enhancedPermissions.push({
                    'User_ID' : permissions[i].User_ID,
                    'Permission' : 'delete permissions'
                })
                break;
        }
    }
    return enhancedPermissions;
}
function presentPermissionForOneUser(enhancedResults , id) {
    // form the response in enhanced form
    let moreClearresult = {};
    moreClearresult.description = 'The use who has User Id = ' + id + " has these permissions:";
    moreClearresult.permissions = {};
    for(let i = 0; i < enhancedResults.length; i++)
        moreClearresult.permissions[i+1] = enhancedResults[i].Permission;
    return moreClearresult;
}


module.exports = {
    presentPermission,
    presentPermissionForOneUser
}