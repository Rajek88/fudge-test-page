import { Check, Warning, WarningOctagon } from "@phosphor-icons/react"
import { Button } from "components/Button"
import { Callout } from "components/Callout"
import { Input } from "components/Input"
import { Page } from "components/Page"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "components/Table"
import React from "react"

export const Example = () => {
    const [value1, setValue1] = React.useState("Example input")
    const [value2, setValue2] = React.useState("Input with error state")

    return (
        <Page
            title="Example Page"
            className="[&>div]:py-8 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0 divide-y"
        >
            <div>
                <div>
                    <div>This is an example page.</div>
                    <div>
                        Here are some UI components you can use to build the
                        pages for the test...
                    </div>
                </div>
            </div>
            <div>
                <Callout variant="error">This is an error callout</Callout>
            </div>
            <div>
                <Callout variant="warning">This is a warning callout</Callout>
            </div>
            <div>
                <Input value={value1} onChange={setValue1} />
            </div>
            <div>
                <Input
                    value={value2}
                    onChange={setValue2}
                    error="Input with error"
                />
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <Button onClick={() => alert("hi!")}>
                        Primary Button (click me!)
                    </Button>
                    <Button onClick={() => alert("hi!")} variant="inline">
                        Inline Button
                    </Button>
                    <Button href="/not-found">Link Button</Button>
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <div className="font-medium">Icons:</div>
                <Check size={20} className="text-green-500" />
                <WarningOctagon size={20} className="text-amber-500" />
                <Warning size={20} className="text-red-500" />
                <Button
                    variant="inline"
                    href="https://phosphoricons.com/"
                    negativeMargin
                >
                    View All
                </Button>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Column 1</TableHead>
                            <TableHead>Column 2</TableHead>
                            <TableHead>Column 3</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Example</TableCell>
                            <TableCell>Table</TableCell>
                            <TableCell>
                                <Button
                                    negativeMargin
                                    onClick={() => alert("hi!")}
                                    variant="inline"
                                >
                                    With Button
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Example</TableCell>
                            <TableCell>Table</TableCell>
                            <TableCell>
                                <Button
                                    negativeMargin
                                    onClick={() => alert("hi!")}
                                    variant="inline"
                                >
                                    With Button
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Page>
    )
}
