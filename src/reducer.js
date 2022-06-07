
export const initialState = {
    active_user:null,
    active_admin:null,
    sorting_range: 0
}
const reducer = (state, action)=>
{
    console.log(action.type);
    {
        switch(action.type){
            case 'Add_logged_user':
                return{
                    ...state,
                    active_user: action.logged_user
                }
                break;
            case 'Add_logged_admin':
                return{
                    ...state,
                    active_admin: action.logged_admin
                }
                break;
                case 'Remove_logged_admin':
                   
                    return{
                        ...state,
                        active_admin: action.logged_admin
                    }
                    break;

                case 'Add_sorted_customers':
                    return{
                        ...state,
                        sorting_range: action.sorting_range
                    }
                    break;
        }
    }
}
    export default reducer;