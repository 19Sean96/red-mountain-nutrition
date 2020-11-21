import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
export default function Schedule() {
	const router = useRouter()

	useEffect(() => {
		router.push({
			pathname: '/schedule/1'
		}, "/schedule/1")
	})

	return <></>
}

