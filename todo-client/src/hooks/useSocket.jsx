import { useMemo } from 'react'
import socket from '../api/socket'

// custom hook to use socket
const useSocket = () => {

    return useMemo(() => socket, [])
}

export default useSocket