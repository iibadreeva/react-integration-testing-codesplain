import {screen, render} from '@testing-library/react'
import RepositoriesSummary from "./RepositoriesSummary";

test('displays information about the repository', () => {
    const repository = {
        language: 'Javascript',
        stargazers_count: 5,
        forks: 30,
        open_issues: 1,
    }
    render(<RepositoriesSummary repository={repository} />)

    for(const key in repository){
        const value = repository[key]
        const el = screen.getByText(new RegExp(value))
        expect(el).toBeInTheDocument()
    }
})