'use client'

import React, { useEffect, useState } from "react";
import { getAnime } from "@/app/service/requests";
import { Flex, Pagination } from 'antd';
import AnimeCard from "../AnimeCards/AnimeCards";

export default function PanelAnime(data: IRequestData) {
    const [res, setRes] = useState<IResponse>()

    let request: string[] = [];
    const fetchAnimes = async () => {
        const res_data = await getAnime(request.join("&"));
        setRes(res_data);
    };

    useEffect(() => {
        request = []
        if (data.sort != "default" && data.sort != undefined) {
            request.push("order_by=" + data.sort)
        }
        if (data.filters.rating != "default" && data.filters.rating != undefined) {
            request.push("rating=" + data.filters.rating)
        }
        if (data.filters.status != "default" && data.filters.status != undefined) {
            request.push("status=" + data.filters.status)
        }
        if (data.filters.type != "default" && data.filters.type != undefined) {
            request.push("type=" + data.filters.type)
        }
        request.push("sort=" + data.filters.search_query_sort)
        request.push("page=" + data.numberPage)
        fetchAnimes();
    }, [data])

    return (
        <div >
            <Flex
                style={{
                    margin: "1%",
                    flexDirection: 'row',
                    overflowY: 'auto',
                    height: "10%",
                    gap: 1
                }}
                wrap gap="small">
                {res != undefined ?
                    res.data != undefined ?
                        res.data.map(anime =>
                        (
                            <AnimeCard {...anime}></AnimeCard>
                        )
                        )
                        :
                        "нетю"
                    : "нетю"}
            </Flex>
            <div className='pagination' style={{ position: "absolute", top: "10px", right: "10px" }}>
                <Pagination
                    current={data.numberPage}
                    pageSize={25}
                    total={(res != undefined ? res.pagination.items.total : 1)}
                    onChange={data.setNumberPage}
                    align="center"
                />
            </div>
        </div>
    )
}