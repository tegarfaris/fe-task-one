import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  REQUEST_ADD_JOBS,
  REQUEST_GET_LIST_JOB,
} from "../../features/job/actions";

const useJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobList, pending, success, isEmpty } = useSelector(
    (state) => state.jobs
  );

  const getJobList = useCallback(() => {
    dispatch(REQUEST_GET_LIST_JOB()).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        return console.log("berhasil bos");
      } else if (result.meta.requestStatus === "rejected") {
        console.error("Gagal boss:", result.error);
      }
    });
  }, [dispatch]);

  const addJob = useCallback(
    (newProduct) => {
      dispatch(REQUEST_ADD_JOBS(newProduct)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          alert("Berhasil ditambahkan");
          navigate("/job-list");
        } else if (result.meta.requestStatus === "rejected") {
          console.error("error nich: ", result.error);
        }
      });
    },
    [dispatch, navigate]
  );
  return {
    jobList,
    pending,
    success,
    isEmpty,
    getJobList,
    addJob,
  };
};

export default useJobs;
