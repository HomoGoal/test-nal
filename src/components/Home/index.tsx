import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBlog } from "src/store/blogSlice";
import styles from "./styles.module.scss";
import { deleteBlog } from "src/services/apis/blog/blog";
import { ModalEditBlog } from "../ModalEditBlog";
import { Pagination, Spin, Input, Select, Form, Button } from "antd";
import { ModalCreateBlog } from "../ModalCreateBlog";
import { ListBlogType } from "src/types/home/home.type";
import { optionsSortBy, optionsSortByDirection } from "./mock-data";

export function Home() {
  const dispatch = useDispatch();

  const { loading, listBlog } = useSelector((state: any) => state.blogReducer);

  const [list, setList] = useState<ListBlogType>([]);
  const [visbile, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<object>();
  const [page, setPage] = useState<number>(1);
  const [visibleCreate, setVisibleCreate] = useState<boolean>(false);

  const [form] = Form.useForm();

  const search = Form.useWatch("search", form);
  const sort_by = Form.useWatch("sort_by", form);
  const sort_direction = Form.useWatch("sort_direction", form);

  const reload = () => {
    const data = {
      page,
      search,
      sort_by,
      sort_direction,
    };
    dispatch(getListBlog(data)).then(() =>
      window.scrollTo({ top: 0, behavior: "auto" })
    );
  };

  const reloadFirstPage = () => {
    const data = {
      page: 1,
      search,
      sort_by,
      sort_direction,
    };
    dispatch(getListBlog(data)).then(() => {
      setPage(1);
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      sort_by: optionsSortBy?.[3]?.value,
      sort_direction: optionsSortByDirection?.[1]?.value,
    });
  }, []);

  useEffect(() => {
    setList(listBlog?.data?.items || []);
    setPage(listBlog?.pagination?.page);
  }, [listBlog]);

  useEffect(() => {
    reload();
  }, [page]);

  useEffect(() => {
    const timeCall = setTimeout(() => {
      reloadFirstPage();
    }, 300);
    return () => clearTimeout(timeCall);
  }, [search, sort_by, sort_direction]);

  const handleDelete = (value: number) => {
    deleteBlog(value).then(() => dispatch(getListBlog()));
  };

  const handleEdit = (value: object) => {
    setData(value);
    setVisible(true);
  };

  const handleCreateBlog = () => {
    setVisibleCreate(true);
  };

  return (
    <div className={styles.blogListContainer}>
      <Form form={form} className={styles.filterContainer}>
        <Form.Item name="search">
          <div>
            <p>Search</p>
            <Input />
          </div>
        </Form.Item>
        <div>
          <p>Sort By</p>
          <Form.Item name="sort_by">
            <Select disabled={loading} options={optionsSortBy} />
          </Form.Item>
        </div>
        <div>
          <p>Sort Direction</p>
          <Form.Item name="sort_direction">
            <Select disabled={loading} options={optionsSortByDirection} />
          </Form.Item>
        </div>
      </Form>
      <Button
        onClick={handleCreateBlog}
        className="btn btn-primary"
        loading={loading}
      >
        CREATE BLOG
      </Button>
      <ul className={styles.blogListWrap}>
        {list?.map((x: any) => (
          <li className={styles.blogItem}>
            <a href={`/test-nal/${x?.id}`}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <Spin size="large" />
                </div>
              ) : (
                <img src={x?.image?.url} className="mr-3" alt="..." />
              )}
            </a>
            <div className="media-body">
              <h5 className="mt-0 mb-1">{x?.title}</h5>
              {x?.content}
            </div>
            <div className={styles.actionWrap}>
              <div className={styles.delete} onClick={() => handleEdit(x)}>
                EDIT
              </div>

              <div
                className={styles.delete}
                onClick={() => handleDelete(x?.id)}
              >
                REMOVE
              </div>
            </div>
          </li>
        ))}
        {visbile && (
          <ModalEditBlog
            visible={visbile}
            onCancel={() => setVisible(false)}
            data={data}
            reload={reload}
          />
        )}
      </ul>
      <Pagination
        total={listBlog?.pagination?.count}
        pageSize={20}
        current={page}
        onChange={(e) => setPage(e)}
        showSizeChanger={false}
      ></Pagination>
      {visibleCreate && (
        <ModalCreateBlog
          visible={visibleCreate}
          onCancel={() => {
            setVisibleCreate(false);
          }}
          reload={reloadFirstPage}
        />
      )}
    </div>
  );
}
