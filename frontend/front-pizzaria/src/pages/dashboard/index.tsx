import { useState } from "react";
import { Header } from "@/src/components/Header";
import { onlySSRAuth } from "@/src/utils/onlySSRAuth";
import Head from "next/head";

import { FiRefreshCcw } from "react-icons/fi";
import styles from "@/src/pages/dashboard/styles.module.scss";

import { setupAPIClient } from "@/src/services/api";

import { ModalOrder } from "@/src/components/ModalOrder";

import Modal from 'react-modal';

type OrdersProps = {
  id: string;
  table: string | boolean;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: OrdersProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)


  function handleCloseModal(){
    setModalVisible(false)
  }

  async function handleOpenModalOrder(id: string){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/orders/detail', {
            params: {
                order_id: id
            }
        })

        setModalItem(response.data)
        setModalVisible(true)
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos Pedidos</h1>
            <button>
              <FiRefreshCcw color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalOrder(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa - {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>

        {modalVisible && (
            <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}

            />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = onlySSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  const response = await apiClient.get("/orders");

  return {
    props: {
      orders: response.data,
    },
  };
});
