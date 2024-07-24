import { useEffect, useState } from "react"
import { Student } from "../../../services/auth/auth.interface"
import StudentsList from "../../../components/studentsList/studentsList"
import { getStudents } from "../../../services/students/students"




export const StudentsPage = () => {

    const [students, setStudents] = useState<Student[]>([{
        id : '',
        email : '',
        first_name : '',
        last_name : '',
        media : ''
    }])

    useEffect(() => {
        getStudents().then(res => {
            setStudents(res)}
        ).catch(e => console.log(e))
    }, [])



    
    return (
        <div className='container'>
            <div className="row justify-content-md-center">
                <h1 className="col-md-10">Students</h1>
            </div>
            <StudentsList students={students} />

        </div>

    );
}