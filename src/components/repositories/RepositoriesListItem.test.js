import {render, screen, act} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

// В компоненте <FileIcon используется промис, поэтому мы заменяем этот компонент
/*jest.mock('../tree/FileIcon', () => {
    // content of fileIcon.js
    return () => {
        return 'File Icon Component'
    }
})*/
const renderComponent = () => {
    const  repository = {
        full_name: 'facebook/react',
        language: 'JavaScript',
        description: 'A js library',
        owner: {
            login: 'facebook'
        },
        name: 'react',
        html_url: 'https//github.com/facebook/react'
    }
    // repository.html_url = '/repositories/' + repository.full_name
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository} />
        </MemoryRouter>
    )

    return {repository}
}


const pause = () => {
    return new Promise(resovle => setTimeout(resovle, 100))
}

test('shows a link to the github homepage for this repository', async () => {
    const {repository} = renderComponent()
    // screen.debug()
    // await screen.findByRole('img', {name: /javascript/gi })

    // await act(async () => {
    //     await pause()
    // })
    const link = screen.getByRole('link', {
        name: /github repository/gi
    })
    expect(link).toHaveAttribute('href', repository.html_url)

})

test('show a fileicon with the appropriate icon', async () => {
    renderComponent()
    const icon = await screen.findByRole('img', {name: new RegExp(/javascript/, 'gi') })
    expect(icon).toHaveClass('js-icon')
    expect(icon).not.toHaveClass('ts-icon')
})

test('show a link to the code editor page', async () => {
    const {repository} = renderComponent()
    await screen.findByRole('img', {name: new RegExp(/javascript/, 'gi') })
    const link = await screen.findByRole('link', {
        name: new RegExp(repository.owner.login)
    })
    expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})