import { notFound } from "next/navigation";
import { getOrders } from '@/lib/mock-data';
import styles from './page.module.css';
import Link from 'next/link';

interface PageProps {
    params: Promise<{
        orderId: string;
    }>
}

export default async function SupportPage({ params }: PageProps) {
    const { orderId } = await params;
    const order = getOrders().find(o => o.id === orderId);

    if (!order) {
        return (
            <main className={styles.container}>
                <h1>Order Not Found</h1>
                <p>We couldn't find an order with ID: {orderId}</p>
                <Link href="/" style={{ textDecoration: 'underline' }}>Return Home</Link>
            </main>
        )
    }

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1>Order Support: #{order.id.split('-')[1]}</h1>
                <span className={styles.status}>{order.status}</span>
            </div>

            <div className={styles.grid}>
                <div className={styles.chatSection}>
                    <h2>Message Your Builder</h2>
                    <div className={styles.chatBox}>
                        <div className={styles.messageRow}>
                            <div className={styles.avatar}>QM</div>
                            <div className={styles.messageBubble}>
                                <p>Hi {order.customerName.split(' ')[0]}, thanks for your order! I'm {order.builderName || 'your builder'}, and I'll be crafting your pieces. I'll update you here when we start cutting the wood.</p>
                                <span className={styles.time}>{order.date}</span>
                            </div>
                        </div>
                        {/* Mock User Reply */}
                    </div>
                    <div className={styles.inputArea}>
                        <input type="text" placeholder="Type a message..." className={styles.input} />
                        <button className={styles.sendBtn}>Send</button>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h3>Order Details</h3>
                    <ul className={styles.itemsList}>
                        {order.items.map((item, i) => (
                            <li key={i}>{item.quantity}x Product ({item.productId})</li>
                        ))}
                    </ul>
                    <div className={styles.builderInfo}>
                        <h3>Your Builder</h3>
                        <p>{order.builderName || 'Assigned soon...'}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
