import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Store } from '../../Store';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: '',
        lists: action.payload.lists,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload };
    default:
      return;
  }
};

export default function SubscribersEmail() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  // const [lists, setLists] = useState([]);
  const [{ loading, error, lists, pages }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    lists: [],
  });

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `/api/emailnotify/subscriberlist?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      };

      fetchData();
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  }, [userInfo.token, page]);

  return (
    <div className="h-screen justify-center items-center mx-auto">
      <div className="flex flex-col p-8">
        <h1 className="md:text-3xl text-md font-bold p-1">Subscriber List</h1>
        <div className="mx-auto mt-[50px] xl:w-[1200px] md:w-[900px] w-[350px]">
          <div className="shadow-md sm:rounded-lg lg:overflow-hidden overflow-x-auto">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox />
            ) : (
              <table className="table-auto w-full border-collapse text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 "
                    >
                      No.
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 "
                    >
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 "
                    >
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lists.map((list, index) => {
                    return (
                      <tr
                        key={list.id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 text-gray-900  bg-gray-50">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">{list.id}</td>
                        <td className="px-6 py-4 text-gray-900  bg-gray-50">
                          {list.email}
                        </td>
                        <td className="px-6 py-4 font-medium  dark:text-white dark:bg-gray-800">
                          {list.createdAt}
                        </td>

                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 w-32">
                          {list.updatedAt}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {Array.isArray(lists) && lists.length && (
              <div className="mt-10 flex justify-center items-center">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === Number(page) ? 'font-bold' : ''}
                    style={{ margin: '0 7px' }}
                    to={`/admin/subscriberslist?page=${x + 1}`}
                    key={x + 1}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
