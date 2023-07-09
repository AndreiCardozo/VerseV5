import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import ilegalData from '../../assets/ilegal/Ilegal.json';
import styles from './Ilegal.module.css';
import { Button } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Footer } from '../../components/Footer';

export function Ilegal({ carrinho, setCarrinho }) {
    const [ilegal, setIlegal] = useState([]);
    const [detalhesVisible, setDetalhesVisible] = useState(false);
    const [detalhesIlegal, setdetalhesIlegal] = useState(null);

    useEffect(() => {
        setIlegal(ilegalData.ilegal);
    }, []);

    const adicionarAoCarrinho = (ilegal) => {
        const itemExistente = carrinho.find((item) => item.nome === ilegal.NomeIlegal);
        if (itemExistente) {
            const novoCarrinho = carrinho.map((item) => {
                if (item.nome === ilegal.NomeIlegal) {
                    return {
                        ...item,
                        quantidade: item.quantidade + 1,
                    };
                }
                return item;
            });
            setCarrinho(novoCarrinho);
        } else {
            const novoCarrinho = [
                ...carrinho,
                { id: ilegal.NomeIlegal, nome: ilegal.NomeIlegal, preco: ilegal.PrecoIlegal, quantidade: 1 },
            ];
            setCarrinho(novoCarrinho);
        }
    };

    const exibirDetalhes = (ilegal) => {
        setdetalhesIlegal(ilegal);
        setDetalhesVisible(true);
    };

    const fecharDetalhes = () => {
        setDetalhesVisible(false);
        setdetalhesIlegal(null);
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.ilegalGrid1}>
                <div className={styles.ilegalGrid}>
                    {ilegal.map((ilegal) => (
                        <div key={ilegal.NomeIlegal} className={styles.ilegalItem}>
                            <img src={ilegal.ImgIlegal} alt={ilegal.NomeIlegal} className={styles.ilegalImage} />
                            <h2>{ilegal.NomeIlegal}</h2>
                            <p>Preço: R${ilegal.PrecoIlegal}</p>
                            <div className={styles.buttonsContainer}>
                                <Button colorScheme="green" className={styles.doarButton} onClick={() => adicionarAoCarrinho(ilegal)}>
                                    Adicionar ao carrinho
                                </Button>
                                <Button colorScheme="blue" className={styles.detalhesButton} onClick={() => exibirDetalhes(ilegal)}>
                                    ?
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={detalhesVisible} onClose={fecharDetalhes} size="md">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{detalhesIlegal?.NomeIlegal}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>{detalhesIlegal?.DescIlegal}</p>
                        <p>Preço: R${detalhesIlegal?.PrecoIlegal}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={fecharDetalhes}>
                            Fechar
                        </Button>
                        <Button colorScheme="green" onClick={() => adicionarAoCarrinho(detalhesIlegal)}>
                            Adicionar ao Carrinho
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Footer />
        </div>
    );
}
