// from libraries
import swal from "sweetalert";

export const deletePopup = (deleteRecord, id = null) => {
  console.log("id", id);
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Detail!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! This detail has been deleted!", {
        icon: "success",
      });
      typeof id === "number" ? deleteRecord(id) : deleteRecord(id);
    } else {
      swal("This detail is safe!");
    }
  });
};
