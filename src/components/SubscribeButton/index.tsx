import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {

    if (!session) {
      signIn('sighub');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    // Cria a checkout session (Chama a rota de "backend" do next)

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({sessionId});

    } catch(err) {
      console.log('deu erro');
      alert(err.message);
      console.warn(err.message);
    }

  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}