import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  // Buscar o usuario no banco do faudadb com o ID {customerId}
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  console.log('saiu do useRef', userRef)

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  console.log('saiu do subscriptionData', subscriptionData)
  if (createAction) {
    // salvar os dados da subscription no faunadb
    console.log('é create')
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'), { data: subscriptionData }
      )
    )
  } else {
    console.log('n create')
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ),
        {data: subscriptionData}
      )
    )
  }
  console.log('saiu do metodo')
}