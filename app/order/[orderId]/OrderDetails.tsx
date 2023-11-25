import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import localization from "moment/locale/fr";

moment.locale("fr", localization);
moment.locale("fr");
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface orderDetailsProps {
  order: Order;
}
const OrderDetails: React.FC<orderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="détails de la commande" />
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Montant total:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Statut de paiement:</div>
        <div>
          {order.status === "en attente" ? (
            <Status
              text="En attente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="Complété"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>Statut de livraison:</div>
        <div>
          {order.deliveryStatus === "en attente" ? (
            <Status
              text="En attente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "expédié" ? (
            <Status
              text="Expédié"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "livré" ? (
            <Status
              text="Livré"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.createdAt).fromNow()}</div>
      <div>
        <h2 className="font-semiblold mt-4 mb-2">Produits commandés</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUIT</div>
          <div className="justify-self-center">PRIX</div>
          <div className="justify-self-center">QTÉ</div>
          <div className="justify-self-end">TOTAL</div>
        </div>

        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
