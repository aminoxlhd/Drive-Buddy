import { useEffect, useState } from "react"
import { Teacher } from "../../../services/auth/auth.interface"
import { getTeachers } from "../../../services/teachers/Teachers"
import TeachersList from "../../../components/teachersList/teachersList"




export const TeachersPage = () => {

    const [teachers, setTeachers] = useState<Teacher[]>([{
        id : '',
        email : '',
        first_name : '',
        last_name : '',
        media : ''
    }])

    useEffect(() => {
        getTeachers().then(res => {
            setTeachers(res)}
        ).catch(e => console.log(e))
    }, [])



    
    return (
        <div className='container'>
            <div className="row justify-content-md-center">
                <h1 className="col-md-10">Teachers</h1>
            </div>
            <TeachersList teachers={teachers} />

        </div>

    );
}