import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss'
const repository = {
    name: "Atividade",
    description: "Descrição da Atividade",
    link: "https://github.com/SASHIRl/DW2A4"
}

export function RepositoryList() {
    return (
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>
            <ul>
                <RepositoryItem repository={repository}/>
                <RepositoryItem repository={repository}/>
                <RepositoryItem repository={repository}/>
            </ul>
        </section>
    )
}