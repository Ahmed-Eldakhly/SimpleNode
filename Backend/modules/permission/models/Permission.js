
function APINamingMap(API_Name)
{
    switch(API_Name){
        case 'Login':
            return 1;
        case 'Show_User':
            return 2;
        case 'Edit_User':
            return 3;
        case 'Add_User':
            return 4;
        case 'Delete_User':
            return 5;
        case 'Show_Permission':
            return 6;
        case 'Edit_Permission':
            return 7;
        case 'Add_Permission':
            return 8;
        case 'Delete_Permission':
            return 9;
    }
    return 0;
}

module.exports = {
    APINamingMap
};



