import { Text, Box, Flex, Tabs, Stack } from '@chakra-ui/react';
import { Toaster } from "@/components/ui/toaster";
import { useState } from 'react';
import AddExpenseTab from './components/AddExpenseTab';
import ExpensesTab from './components/ExpensesTab';
import StatsTab from './components/StatsTab';
//import theme from './components/theme';

export const BASE_URL = "http://127.0.0.1:5000/api";

function App() {

  const [expenses, setExpenses] = useState([]);

  return (
    <>
    <Toaster/>
    <Flex direction="column" margin="18px">
      <Box fontSize="28px" fontWeight="bold">Welcome, User!</Box>
      <Box width="full">
        <Tabs.Root defaultValue="expenses" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger value="expenses"> Expenses </Tabs.Trigger>
            <Tabs.Trigger value="add-expense"> Add Expense </Tabs.Trigger>
            <Tabs.Trigger value="tasks"> Statistics </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="expenses" width="full" maxW="1000px" mr="10px">
            <Box>
              <Stack>
                <Text fontSize="30px" fontWeight="bold"> EXPENSES </Text>
                <ExpensesTab expenses={expenses} setExpenses={setExpenses}/>
              </Stack>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="add-expense">
            <Box>
              <Stack>
                <Text fontSize="30px" fontWeight="bold"> ADD EXPENSE </Text>
                <AddExpenseTab setExpenses={setExpenses}/>
              </Stack>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="tasks">
            <Box>
              <Stack>
                <Text fontSize="30px" fontWeight="bold"> STATISTICS </Text>
                <StatsTab></StatsTab>
              </Stack>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Flex>
    </>
  );
}

export default App
