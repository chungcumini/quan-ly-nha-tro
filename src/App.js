import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Modal,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  useTheme,
  useMediaQuery,
  Tooltip,
  Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Dữ liệu mẫu được trích xuất từ file Client.csv của bạn
const mockClients = [
  { id: 1, phong: '201', ten: 'Nguyễn Thị Huyền Trang', tinhtrang: 'Sắp chuyển đi', sdt: '0985462248', namsinh: 1998, nghenghiep: 'Kỹ thuật may', noithuongtru: 'Thôn Nhân Bình, Vũ Vân, Vũ Thư, Thái Bình', cccd: '034198004502', bienso: 'Trang: 17B2 - 57467', notes: '' },
  { id: 2, phong: '201', ten: 'Trần Quốc Tuấn', tinhtrang: 'Sắp chuyển đi', sdt: '0913467865', namsinh: 1998, nghenghiep: '', noithuongtru: 'Đức Thuận, Thị Xã Hồng Lĩnh, Hà Tĩnh', cccd: '042098001070', bienso: 'Tuấn: 38F1 - 12445', notes: '' },
  { id: 3, phong: '202', ten: 'Mai Huy Hoàng', tinhtrang: 'Đang ở', sdt: '', namsinh: 2006, nghenghiep: 'Sinh viên', noithuongtru: 'Thôn Kép 12, Hương Sơn, Lạng Giang, Bắc Giang', cccd: '024206013568', bienso: '', notes: '' },
  { id: 4, phong: '202', ten: 'Đỗ Trọng Hoàn', tinhtrang: 'Đang ở', sdt: '', namsinh: 2005, nghenghiep: 'Sinh viên', noithuongtru: 'Thôn Kép 12, Hương Sơn, Lạng Giang, Bắc Giang', cccd: '024205012538', bienso: 'Hoàn: 98B3 - 52064', notes: '' },
  { id: 16, phong: '501', ten: 'Nguyễn Quỳnh Anh', tinhtrang: 'Sắp chuyển đi', sdt: '0836993331', namsinh: 2006, nghenghiep: 'Sinh viên', noithuongtru: 'Tổ 2, Cốc Lếu, Thành phố Lào Cai, Lào Cai', cccd: '010306000342', bienso: 'Quỳnh Anh: 24AA - 04025', notes: '' },
  { id: 19, phong: '601', ten: 'Nguyễn Long', tinhtrang: 'Đang ở', sdt: '', namsinh: 1991, nghenghiep: 'Bác sĩ', noithuongtru: '', cccd: '', bienso: '', notes: '' },
  { id: 20, phong: '601', ten: 'Vũ Thị Phương Nhi', tinhtrang: 'Đã ngừng ở', sdt: '0945770962', namsinh: 2002, nghenghiep: 'Sinh viên', noithuongtru: 'Yên Phong, Ý Yên, Nam Định', cccd: '036302007657', bienso: '', notes: '' }
];

// Component hiển thị chi tiết thông tin khách thuê
const ClientDetailCard = ({ client }) => (
  <Card variant="outlined">
    <CardHeader title={`Thông tin chi tiết: ${client.ten}`} subheader={`Phòng: ${client.phong}`} />
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2"><strong>Năm sinh:</strong> {client.namsinh || 'Chưa có'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2"><strong>Nghề nghiệp:</strong> {client.nghenghiep || 'Chưa có'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2"><strong>Nơi thường trú:</strong> {client.noithuongtru || 'Chưa có'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2"><strong>Số CCCD:</strong> {client.cccd || 'Chưa có'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2"><strong>Biển số xe:</strong> {client.bienso || 'Chưa có'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2"><strong>Ghi chú:</strong> {client.notes || 'Không có'}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default function App() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [open, setOpen] = useState(false);
  
  const theme = useTheme();
  // Kiểm tra xem màn hình có phải là mobile không
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenModal = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  // Hàm để chọn màu cho trạng thái
  const getStatusChip = (status) => {
    if (status === 'Đang ở') return <Chip label={status} color="success" size="small" />;
    if (status === 'Sắp chuyển đi') return <Chip label={status} color="warning" size="small" />;
    return <Chip label={status} color="default" size="small" />;
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trung Tâm Điều Hành Nhà Trọ
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant={isMobile ? "h5" : "h4"} gutterBottom component="div">
              Quản Lý Khách Thuê
            </Typography>
            <Button variant="contained" startIcon={<PersonAddIcon />}>
              Thêm Khách
            </Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#eeeeee' }}>
              <TableRow>
                <TableCell>Phòng</TableCell>
                <TableCell>Tên Khách Thuê</TableCell>
                <TableCell>Tình trạng</TableCell>
                {!isMobile && <TableCell>Số Điện Thoại</TableCell>}
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="bold">{client.phong}</Typography>
                  </TableCell>
                  <TableCell>{client.ten}</TableCell>
                  <TableCell>{getStatusChip(client.tinhtrang)}</TableCell>
                  {!isMobile && <TableCell>{client.sdt || 'N/A'}</TableCell>}
                  <TableCell align="center">
                    <Tooltip title="Xem chi tiết">
                      <IconButton color="primary" onClick={() => handleOpenModal(client)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sửa">
                      <IconButton color="secondary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton sx={{ color: 'error.main' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal hiển thị chi tiết thông tin */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="client-detail-modal-title"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedClient && <ClientDetailCard client={selectedClient} />}
        </Box>
      </Modal>
    </div>
  );
}
