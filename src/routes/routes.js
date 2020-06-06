import HomePage from "../views/HomePage";
import Transfer from "../views/Transfer";
import Payment from "../views/payment";

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
