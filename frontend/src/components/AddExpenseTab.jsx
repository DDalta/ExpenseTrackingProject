import { Box, Button, InputGroup, Input, Fieldset, Field, Select, createListCollection, Portal } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import { useState } from "react"
import { BASE_URL } from "@/App"

const AddExpenseTab = ({setExpenses}) => {

    const [inputs, setInputs] = useState({
        amount: "",
        category: "",
        description: "",
        date: ""
    })

    const categories = createListCollection({
        items: [
            { label: "Food & Dining", value: "FOOD" },
            { label: "Auto & Transport", value: "AUTO" },
            { label: "Bills & Utilities", value: "BILLS" },
            { label: "Business Services", value: "BUSINESS" },
            { label: "Education", value: "EDUCATION" },
            { label: "Entertainment", value: "ENTERTAINMENT" },
            { label: "Fees & Chargers", value: "FEES" },
            { label: "Gifts & Donations", value: "GIFTS" },
            { label: "Health & Fitness", value: "HEALTH" },
            { label: "Home", value: "HOME" },
            { label: "Personal Care", value: "PERSONAL" },
            { label: "Pets", value: "PETS" },
            { label: "Shopping", value: "SHOP" },
            { label: "Taxes", value: "TAXES" },
            { label: "Travel", value: "TRAVEL" }
        ],
    })

    const handleCreateExpense = async (e) => {
        e.preventDefault();
        try {
            console.log(inputs);
            const res = await fetch(BASE_URL + "/expense", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })

            const response = await res.json();

            if (!res.ok) {
                throw new Error(response.error);
            }

            setExpenses((prevExpenses) => [...prevExpenses, response]);
            
            toaster.create({
                title: `Successfully Created Expense`,
                type: "success",
            })

            setInputs({
                amount: "",
                category: "",
                description: "",
                date: ""
            })

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
        <form onSubmit={handleCreateExpense}>
        {console.log(categories)}
        <Fieldset.Root>
            <Fieldset.Content>
                <Field.Root orientation="horizontal" required>
                    <Field.Label>Category</Field.Label>

                    <Select.Root collection={categories} size="sm" width="320px" value={inputs.category !== "" ? [inputs.category]: []} onValueChange={(e) => setInputs({...inputs, category: e.value[0]})}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select Category" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                        <Select.Content>
                            {categories.items.map((category) => (
                            <Select.Item item={category} key={category.value}>
                                {category.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                            ))}
                        </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                </Field.Root>

                <Field.Root orientation="horizontal" required>
                    <Field.Label>Amount</Field.Label>
                    <InputGroup startAddon="$" endAddon="USD">
                        <Input placeholder="0.00" type="number" step="0.01" value={inputs.amount} onChange={(e) => setInputs({...inputs, amount: e.target.value})}/>
                    </InputGroup>
                </Field.Root>

                <Field.Root orientation="horizontal" required>
                    <Field.Label>Description</Field.Label>
                    <Input placeholder="Description" value={inputs.description} onChange={(e) => setInputs({...inputs, description: e.target.value})}/>
                </Field.Root>

                <Field.Root orientation="horizontal" required>
                    <Field.Label>Date</Field.Label>
                    <Input type="date" value={inputs.date} onChange={(e) => setInputs({...inputs, date: e.target.value})}/>
                </Field.Root>

                <Button type="submit">Add Expense</Button>
            </Fieldset.Content>
        </Fieldset.Root>
        </form>    
        </>
    )
}

export default AddExpenseTab;