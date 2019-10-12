export default function createObjectError({ message, code }: { message: string, code: number }) {
  return {
    error: {
      'name': 'Invalid Request',
      'status': code,
      message,
      'statusCode': code
    }
  }
}