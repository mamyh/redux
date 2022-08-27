import { useSelector } from "react-redux";
import Todo from "./Todo";

export default function TodoList() {
    const todos = useSelector((state)=>state.todos);
    const filter= useSelector((state)=>state.filters);
    
    const checkByStatus=(item)=>{
        const {status} = filter;
        switch(status){
            case "All":{
                return true;
            }
            case 'Incomplete':{
                return !item.completed
            }
            case 'Complete' :{
                return item.completed
            }
            default:return true;
        }
    }
    const checkByColor = (item)=>{
        const {colors} = filter;
        if(colors.length >0){
           return colors.includes(item?.color);
        }
        return true;
    }
    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {
                todos
                .filter(item=>checkByStatus(item))
                .filter(item=>checkByColor(item))
                .map(todo=> <Todo key={todo.id} todo={todo} />)
            }
           
        </div>
    );
}
