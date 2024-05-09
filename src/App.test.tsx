import "@testing-library/jest-dom"
import React from "react"
import { render, screen } from "@testing-library/react"
import { Example } from "pages/Example"
import { MemoryRouter } from "react-router-dom"

test("renders learn react link", () => {
    render(
        <MemoryRouter>
            <Example />
        </MemoryRouter>
    )
    const button = screen.getByText(/Primary Button/i)
    expect(button).toBeInTheDocument()
})
