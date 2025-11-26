'use server'

export default async function getActivityDb(userId, date) {
  try {

    const res = await fetch(`${process.env.APP_URL}/api/activity/${userId}/${date}`)

    const activity = await res.json()
    console.log(activity)
    const activities = activity?.msg?.map((item) => { return { isSelected: false, value: item.value, category: item.category } })
    return activities




  } catch (error) {

    console.log(error.message)

  }


}