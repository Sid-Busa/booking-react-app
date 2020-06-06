import HomePage from "./HomePage";
import Transfer from "./Transfer";
import Payment from "./payment";


const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/transfer",
    component: Transfer,
  },
  {
    path: "/payment",
    component: Payment,
  },
];

export default routes;
