import connect from '@/app/_lib/db'

export async function register(){
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

    await connect()
}