import { Box, Table, Text, Button, ActionBar, Checkbox, Portal } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { useEffect, useState } from "react";
import { BASE_URL } from "@/App";

const ExpensesTab = ({expenses, setExpenses}) => {

    const [selection, setSelection] = useState([]);

    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < expenses.length;

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const res = await fetch(BASE_URL + "/expense");
                const response_data = await res.json();

                if (!res.ok) {
                    throw new Error(response_data.error);
                }
                console.log(response_data);
                setExpenses(response_data);
            } catch (error) {
                console.error(error);
            }
        }
        getExpenses();
    }, [setExpenses])


    const handleDeleteSelection = async () => {
        try {
            const res = await fetch(BASE_URL + "/expense", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ids: selection})
            })

            const response_data = await res.json();

            if (!res.ok) {
                throw new Error(response_data.error);
            }

            console.log(response_data);

            toaster.create({
                title: `Successfully Deleted Expenses`,
                type: "warning",
            })
            

            setExpenses(expenses.filter((expense) => !selection.includes(expense.id)))
            setSelection([])

        } catch (error) {
            console.error(error);
        }
    }

    if (expenses.length === 0) {
        return (
            <>
            <Text>No expenses added</Text>
            </>
        )
    } else {
        return (
            <>
            <Table.Root striped>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>
                            <Checkbox.Root 
                                size="sm" 
                                top="0.5"
                                checked={indeterminate ? "indeterminate" : selection.length > 0}
                                onCheckedChange={(changes) => {
                                    // if checked is true, set selection to the ids of all expenses, else set selection is empty 
                                    setSelection(changes.checked ? expenses.map((expense) => expense.id) : [])
                                }}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                            </Checkbox.Root>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Category</Table.ColumnHeader>
                        <Table.ColumnHeader>Date</Table.ColumnHeader>
                        <Table.ColumnHeader>Description</Table.ColumnHeader>
                        <Table.ColumnHeader>Amount</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {expenses.map((expense) => (
                        <Table.Row key={expense.id}>
                            <Table.Cell>
                                <Checkbox.Root 
                                    size="sm" 
                                    top="0.5"
                                    checked={selection.includes(expense.id)}
                                    // if checked is true, add expense id to selection, if not filter out the id just in case it was already in selection
                                    onCheckedChange={(changes) =>
                                        setSelection((prev) => changes.checked ? [...prev, expense.id] : selection.filter((id) => id !== expense.id))
                                    }
                                    >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                </Checkbox.Root>
                            </Table.Cell>
                            <Table.Cell>{expense.category}</Table.Cell>
                            <Table.Cell>{expense.date}</Table.Cell>
                            <Table.Cell>{expense.description}</Table.Cell>
                            <Table.Cell>${expense.amount}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <ActionBar.Root open={hasSelection}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content backgroundColor="lightgray">
                            <ActionBar.SelectionTrigger backgroundColor="white">
                                {selection.length} selected
                            </ActionBar.SelectionTrigger>
                            <ActionBar.Separator />
                            <Button variant="outline" size="sm" backgroundColor="white" onClick={handleDeleteSelection}>
                                Delete Selection
                            </Button>
                        </ActionBar.Content>
                    </ActionBar.Positioner>
                </Portal>
            </ActionBar.Root>

            </>
        )
    }
}

export default ExpensesTab;